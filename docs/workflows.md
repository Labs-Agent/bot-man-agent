# Workflows Documentation

## Overview
Workflows are orchestration components that coordinate multiple agents to accomplish complex tasks. Each workflow consists of a name, description, output specification, and a collection of agents.

## Workflow Model
Workflows are represented by the `WorkflowM` interface:
```typescript
interface WorkflowM {
    name: string;
    workflow: ZeeWorkflow;
}
```

## API Endpoints

### Create a Workflow
- **Endpoint**: `POST /api/workflows`
- **Required Fields**:
  - `name`: Workflow identifier
  - `description`: Workflow description
  - `output`: Expected output format
  - `agents`: Array of agent names
- **Response**: Created workflow

### Get Available Workflows
- **Endpoint**: `GET /api/workflows`
- **Response**: List of all available workflows

### Get Workflow by Name
- **Endpoint**: `GET /api/workflows/:name`
- **Required Fields**:
  - `name`: Workflow identifier
- **Response**: Single workflow matching the name

### Post Prompt to Workflow
- **Endpoint**: `POST /api/workflows/prompt`
- **Required Fields**:
  - `workflowname`: Workflow identifier
  - `prompt`: Input prompt for the workflow
- **Response**: Workflow execution result

## Usage Example
```json
POST /api/workflows
{
    "name": "researchWorkflow",
    "description": "Performs research and analysis",
    "output": "Research summary",
    "agents": ["researcher", "analyzer"]
}
```

## Workflow Service Methods
- `createWorkflow`: Creates new workflow with specified agents
- `getAvailableWorkflows`: Lists all workflows
- `getWorkflowByName`: Retrieves specific workflow
- `postPrompt`: Executes workflow with given prompt

## Integration
Workflows can utilize multiple agents in sequence to process complex tasks and generate comprehensive results.