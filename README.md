# Bot-Man-Agents

This project is a TypeScript backend server that provides routes for managing agents and workflows. It allows users to create new agents, retrieve available agents, create new workflows, and post prompts.

## Features

- Create new agents
- Get available agents
- Create new workflows
- Get available workflows
- Post prompts to agents
- Analyze technology news and create summary reports using AI agents

## Technologies Used

- TypeScript
- Express.js
- Zod (for schema validation)
- Covalent AI Agent SDK

## Project Structure

```
my-backend-app
├── src
│   ├── ai                   # Contains integrated agent and workflow definitions
│   │   └── index.ts         # Defines Research Agent, Summary Agent, and ZeeWorkflow
│   ├── controllers          # Contains controllers for handling requests
│   │   ├── agentController.ts
│   │   └── workflowController.ts
│   ├── models               # Contains data models for agents and workflows
│   │   ├── agent.ts
│   │   └── workflow.ts
│   ├── routes               # Contains route definitions for agents and workflows
│   │   ├── agentRoutes.ts
│   │   └── workflowRoutes.ts
│   ├── services             # Contains business logic for managing agents and workflows
│   │   ├── agentService.ts
│   │   └── workflowService.ts
│   ├── app.ts               # Entry point of the application
│   └── types                # Contains TypeScript types and interfaces
│       └── index.ts
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:Labs-Agent/bot-man-agent.git
   ```
2. Navigate to the project directory:
   ```
   cd bot-man-agent
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run:
```
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints
- **Tools**
   - `GET /api/tools` - Retrieve available tools
   - `POST /api/tools` - Create a new tool
   - `GET /api/tools/:id` - Retrieve a tool by ID
- **Agents**
  - `POST /api/agents` - Create a new agent
  - `GET /api/agents` - Retrieve available agents
  - `GET /api/agents/:name` - Retrieve an agent by name
  - `POST /api/agents/prompt` - Post a prompt to an agent

- **Workflows**
  - `POST /api/workflows` - Create a new workflow
  - `GET /api/workflows` - Retrieve available workflows
   - `GET /api/workflows/:name` - Retrieve a workflow by name
   - `POST /api/workflows/prompt` - Post a prompt to a workflow