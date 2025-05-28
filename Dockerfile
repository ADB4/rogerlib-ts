# Configuration for rogerlib web server Docker image

# Use a minimal Python image as a parent image
FROM --platform=linux/amd64 python:3.12.0

# Copy list of production requirements into Docker container
COPY requirements-prod.txt /tmp

# Install Python package requirements
RUN pip install -r /tmp/requirements-prod.txt

# Copy application into image
COPY dist/rogerlib-0.1.0.tar.gz /tmp

# Install rogerlib web app
RUN pip install /tmp/rogerlib-0.1.0.tar.gz

# Run the web server in the container
CMD gunicorn \
  --workers 4 \
  --worker-class=gevent \
  --bind 0.0.0.0:8000 \
  --timeout 90 \
  --log-level debug \
  rogerlib:app