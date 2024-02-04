from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .forms import UploadFileForm
import os

def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['file']
            # Check if the uploaded file is a PDF
            if uploaded_file.name.endswith('.pdf') and uploaded_file.content_type == 'application/pdf':
                # Process the PDF file (save it, extract text, etc.)
                # For example, to save the PDF file:
                # with open('path/to/save/' + uploaded_file.name, 'wb+') as destination:
                #     for chunk in uploaded_file.chunks():
                #         destination.write(chunk)
                return render(request, 'upload_success.html')
            else:
                # If the uploaded file is not a PDF, handle the error (display a message, redirect, etc.)
                error_message = "Please upload a valid PDF file."
                return render(request, 'upload_form.html', {'form': form, 'error_message': error_message})
    else:
        form = UploadFileForm()
    return render(request, 'upload_form.html', {'form': form})
