# FastAPI Microservices Project

A robust microservices architecture built with FastAPI, featuring authentication, ML processing, notification services, and an API gateway.

## Project Structure
```
.
├── auth/                      # Authentication Service
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── service.py
│   └── requirements.txt
├── gateway/                   # API Gateway Service
│   ├── main.py
│   ├── rpc_client.py
│   └── requirements.txt
├── ml_services/              # Machine Learning Service
│   ├── artifacts/
│   ├── main.py
│   ├── utils.py
│   └── requirements.txt
├── notification_service/     # Email Notification Service
│   ├── email_service.py
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## Services Overview

1. **Gateway Service**
   - Entry point for all incoming requests
   - Routes requests to appropriate microservices
   - Handles service orchestration
   - Manages inter-service communication

2. **ML Service**
   - Processes image data using Keras OCR
   - Extracts text from images
   - Communicates with Gateway Service
   - Handles ML model artifacts

3. **Auth Service**
   - Manages user authentication
   - Handles email verification
   - User registration functionality
   - OTP generation and verification
   - PostgreSQL database integration

4. **Notification Service**
   - Handles email notifications
   - Process completion alerts
   - User communication
   - Email template management

## Architecture Diagram
![microservice diagram](https://github.com/shantanu1905/fastapi-microservice-demo/assets/59206895/692713bc-b445-4e46-8b18-831cc3ac504d)

## Prerequisites

- Python 3.11.8
- Docker and Docker Compose
- Git

## Installation Steps

### 1. Set Up Docker Services

First, start the required Docker containers for PostgreSQL and RabbitMQ:

a) **PostgreSQL Database**
```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=12 -d -p 5432:5432 postgres
```

b) **RabbitMQ Message Broker**
```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
```

### 2. Clone the Repository
```bash
git clone https://github.com/shantanu1905/fastapi-microservice-demo.git
cd fastapi-microservice-demo
```

### 3. Set Up Each Service

You'll need to set up each service individually. Follow these steps for each service directory (auth, gateway, ml_services, notification_service):

#### a) Auth Service
```bash
cd auth
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### b) Gateway Service
```bash
cd gateway
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### c) ML Service
```bash
cd ml_services
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### d) Notification Service
```bash
cd notification_service
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 4. Verify Installation

- PostgreSQL should be running on `localhost:5432`
- RabbitMQ should be running on `localhost:5672` (Management UI on `localhost:15672`)
- Each service will run on its designated port (check individual service configurations)

## Service Dependencies

- PostgreSQL Database (User authentication and data storage)
- RabbitMQ (Message broker for inter-service communication)
- Python packages as specified in each service's requirements.txt

## Development Notes

- Each service runs in its own virtual environment
- Services communicate via RabbitMQ message broker
- Gateway service coordinates all inter-service communication
- Configuration can be modified through environment variables or config files

## Troubleshooting

1. **Docker Issues**
   - Ensure Docker daemon is running
   - Check if ports 5432 and 5672 are available
   - Verify container logs using `docker logs [container-name]`

2. **Service Issues**
   - Verify virtual environment activation
   - Check service logs for errors
   - Ensure all dependencies are installed
   - Verify service configuration files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request