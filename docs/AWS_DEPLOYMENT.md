# AWS Deployment Documentation - Campus Connect

## Overview

This document details the complete AWS deployment process for Campus Connect, including all steps taken, errors encountered, and solutions applied.

**Deployment Date:** January 2024  
**Status:** ✅ Successfully Deployed  
**Live URL:** http://100.26.177.135 (temporary - IP changes on restart)

---

## Architecture

```
GitHub Actions (CI/CD)
        │
        ▼
   AWS ECR (Container Registry)
        │
        ▼
   AWS ECS Fargate (Serverless Containers)
        ├── Frontend Service (Nginx + React)
        └── Backend Service (Node.js + Express)
                    │
                    ▼
           AWS Cloud Map (Service Discovery)
                    │
                    ▼
           MongoDB Atlas (Database)
```

---

## Step-by-Step Deployment Process

### Step 1: Docker Containerization ✅

**What we did:**
- Created `Dockerfile` for backend (Node.js multi-stage build)
- Created `Dockerfile` for frontend (React build + Nginx)
- Created `docker-compose.yml` for local development
- Created `docker-compose.prod.yml` for production
- Created `nginx.conf` for React SPA routing

**Tested locally:** `docker-compose up --build`

---

### Step 2: MongoDB Atlas Setup ✅

**What we did:**
- Created free M0 cluster
- Created database user
- Whitelisted all IPs (0.0.0.0/0)
- Got connection string

---

### Step 3: AWS ECR Repository Creation ✅

**What we did:**
- Created `campus-connect-backend` repository
- Created `campus-connect-frontend` repository

**Error encountered:**
```
name unknown: The repository with name 'campus-connect-backend' does not exist
```

**Fix:** ECR repositories were created in `us-east-1` but workflow used `ap-south-1`. Updated workflow to use `us-east-1`.

---

### Step 4: AWS ECS Cluster Creation ✅

**What we did:**
- Created `campus-connect-cluster`
- Selected AWS Fargate (serverless) infrastructure

---

### Step 5: IAM User for GitHub Actions ✅

**What we did:**
- Created user: `github-actions-deploy`
- Attached policies:
  - `AmazonEC2ContainerRegistryFullAccess`
  - `AmazonECS_FullAccess`
- Generated access keys

---

### Step 6: GitHub Secrets Configuration ✅

**What we did:**
- Added `AWS_ACCESS_KEY_ID`
- Added `AWS_SECRET_ACCESS_KEY`

---

### Step 7: GitHub Actions Workflow Execution

**First Run - Error:**
```
ServiceNotFoundException: Service not found
```

**Reason:** Workflow tried to update ECS services that didn't exist yet.

**What we learned:** The workflow is designed for ongoing deployments after infrastructure exists, not initial setup.

---

### Step 8: ECS Task Definitions ✅

**What we did:**

**Backend Task (`campus-backend-task`):**
- Launch type: Fargate
- CPU: 0.25 vCPU, Memory: 0.5 GB
- Container port: 5000
- Environment variables: PORT, MONGODB_URI, JWT_SECRET, NODE_ENV

**Frontend Task (`campus-frontend-task`):**
- Launch type: Fargate
- CPU: 0.25 vCPU, Memory: 0.5 GB
- Container port: 80

---

### Step 9: ECS Services Creation (Initial Attempt)

**Error encountered:**
```
host not found in upstream "backend" in /etc/nginx/conf.d/default.conf:14
```

**Reason:** Nginx config used `backend` as hostname, which works in Docker Compose (shared network) but not in ECS (separate containers).

---

### Step 10: AWS Cloud Map Setup ✅

**Solution:** Implemented AWS Cloud Map for service discovery.

**What we did:**
1. Created Cloud Map namespace: `campus-connect`
2. Enabled service discovery on backend service
3. Updated `nginx.conf` to use Cloud Map DNS:
   ```nginx
   resolver 169.254.169.253 valid=10s;
   set $backend "backend.campus-connect";
   proxy_pass http://$backend:5000;
   ```

---

### Step 11: Final Service Deployment ✅

**What we did:**
1. Rebuilt frontend image with updated nginx.conf
2. Pushed to ECR via GitHub Actions
3. Created backend service with Service Discovery enabled
4. Created frontend service in same VPC

**Result:** ✅ Website live at http://100.26.177.135

---

## Errors Summary

| Error | Cause | Solution |
|-------|-------|----------|
| ECR repository not found | Wrong region (ap-south-1 vs us-east-1) | Updated workflow region |
| Service not found | ECS services didn't exist | Created task definitions and services manually |
| Host "backend" not found | Docker Compose networking doesn't work in ECS | Implemented AWS Cloud Map for service discovery |

---

## Files Created/Modified

| File | Purpose |
|------|---------|
| `backend/Dockerfile` | Backend container image |
| `frontend/Dockerfile` | Frontend container image |
| `frontend/nginx.conf` | Nginx config with Cloud Map DNS |
| `docker-compose.yml` | Local development |
| `docker-compose.prod.yml` | Production with MongoDB Atlas |
| `.github/workflows/ci.yml` | Build and test pipeline |
| `.github/workflows/deploy-aws.yml` | AWS ECR/ECS deployment |

---

## AWS Resources Created

| Resource | Name | Notes |
|----------|------|-------|
| ECR Repository | campus-connect-backend | Container images |
| ECR Repository | campus-connect-frontend | Container images |
| ECS Cluster | campus-connect-cluster | Fargate cluster |
| ECS Task Definition | campus-backend-task | Backend config |
| ECS Task Definition | campus-frontend-task | Frontend config |
| ECS Service | campus-backend-service | Running backend |
| ECS Service | campus-frontend-service | Running frontend |
| Cloud Map Namespace | campus-connect | Service discovery |
| Security Group | campus-backend-sg | Port 5000 |
| Security Group | campus-frontend-sg | Port 80 |

---

## Cleanup Instructions

To avoid charges, delete in this order:

1. **ECS Services** (stops running containers)
2. **ECS Cluster**
3. **Cloud Map Namespace** (delete services inside first)
4. **ECR Repositories** (frees storage)
5. **Security Groups**
6. **IAM User** (optional)
7. **CloudWatch Log Groups** (optional)

---

## Lessons Learned

1. **Region matters** - ECR, ECS, and all resources must be in the same region
2. **Service discovery is essential** - Container-to-container communication needs Cloud Map or ALB
3. **CI/CD vs Infrastructure** - GitHub Actions handles deployments, not infrastructure creation
4. **Fargate is serverless** - No EC2 instances to manage, but IPs are dynamic