"""
Django management command to seed the database using the ACTUAL scientific PDF articles
located directly in the repository.

Leverages the built-in signal pipeline to automatically extract and populate:
- Article Title
- Authors
- Abstract
- Keywords
- Institutions
- Body text & references

Usage:
    python manage.py seed_db
"""

import os
from pathlib import Path
from datetime import date
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User as DjangoAuthUser
from django.core.files import File
from adminApp.models import Admin
from modAccount.models import Mod
from userManagementApp.models import User as AppUser, FavoriteArticle
from articleManagementAPP.models import Article


def safe_text(s):
    """Encodes strings safely to avoid Windows console cp1252 charmap crashes."""
    if not s:
        return ""
    return str(s).encode("ascii", errors="replace").decode("ascii")


class Command(BaseCommand):
    help = "Seeds the database with actual repository PDF articles, admin, moderators, and users"

    def handle(self, *args, **options):
        self.stdout.write("===================================================")
        self.stdout.write("Seeding TP_IGL Database with Repository Articles")
        self.stdout.write("===================================================")

        # 1. Superuser / Django Admin
        if not DjangoAuthUser.objects.filter(username="admin").exists():
            DjangoAuthUser.objects.create_superuser("admin", "admin@tpigl.com", "admin123")
            self.stdout.write(self.style.SUCCESS("Created Django superuser 'admin' (password: admin123)"))

        # 2. App Admin
        admin_user, created = Admin.objects.get_or_create(
            username="admin",
            defaults={"password": "password123", "email": "admin@tpigl.com"}
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created App Admin 'admin' (password: password123)"))

        # 3. Moderators
        mods_data = [
            ("moderator", "modpass123"),
            ("john_mod", "modpass123"),
        ]
        for username, password in mods_data:
            _, created = Mod.objects.get_or_create(
                username=username,
                defaults={"password": password}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created Moderator '{username}' (password: {password})"))

        # 4. Standard App Users
        users_data = [
            ("user1", "userpass123"),
            ("student_user", "student123"),
            ("researcher_user", "research123"),
        ]
        created_users = []
        for username, password in users_data:
            user_obj, created = AppUser.objects.get_or_create(
                username=username,
                defaults={"password": password}
            )
            created_users.append(user_obj)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created App User '{username}' (password: {password})"))

        # 5. Populate Articles using the actual PDF files present in the repo
        project_dir = Path(__file__).resolve().parent.parent.parent.parent
        pdf_files = sorted(list(project_dir.glob("Article_*.pdf")))

        seen_sizes = set()
        unique_pdf_paths = []
        for pdf_path in pdf_files:
            size = pdf_path.stat().st_size
            if size not in seen_sizes:
                seen_sizes.add(size)
                unique_pdf_paths.append(pdf_path)

        self.stdout.write(f"\nFound {len(unique_pdf_paths)} unique PDF articles in the repository.")
        self.stdout.write("Uploading PDFs to database and extracting metadata automatically...\n")

        created_articles = []
        for idx, pdf_path in enumerate(unique_pdf_paths, start=1):
            pdf_filename = pdf_path.name
            existing_article = Article.objects.filter(pdf_url=pdf_filename).first()

            if existing_article:
                created_articles.append(existing_article)
                display_title = safe_text(existing_article.title or pdf_filename)
                self.stdout.write(f" - [{idx}/{len(unique_pdf_paths)}] Already in database: '{display_title[:55]}...'")
                continue

            with open(pdf_path, "rb") as f:
                # Adding PDF to the table triggers the signal handler to auto-extract metadata!
                article = Article(
                    publication_date=date(2023, 1 + (idx % 12), 10 + (idx % 18)),
                )
                article.pdf_url.save(pdf_filename, File(f), save=False)
                article.save()

            article.refresh_from_db()
            created_articles.append(article)
            display_title = safe_text(article.title if article.title else pdf_filename)
            display_authors = safe_text(article.authors)
            self.stdout.write(self.style.SUCCESS(
                f" - [{idx}/{len(unique_pdf_paths)}] Extracted: '{display_title[:50]}' (Authors: '{display_authors[:25]}')"
            ))

        # 6. Favorite Articles for Demo Users
        if created_users and created_articles:
            demo_user = created_users[0]
            fav_count = 0
            for article in created_articles[:3]:
                fav_id = f"{demo_user.id}0{article.id}"
                fav, created = FavoriteArticle.objects.get_or_create(
                    id=fav_id,
                    defaults={"user": demo_user, "article": article}
                )
                if created:
                    fav_count += 1
            if fav_count > 0:
                self.stdout.write(self.style.SUCCESS(f"\nSeeded {fav_count} favorite articles for user '{demo_user.username}'"))

        self.stdout.write(self.style.SUCCESS("\nDatabase seeding completed successfully!"))
