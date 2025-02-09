# Agents Documentation

## Overview
Agents are autonomous components that can be created and managed through the API. Each agent consists of a name, description, model configuration, instructions, and associated tools.

## Agent Model
Agents are represented by the `AgentM` interface:
```typescript
interface AgentM {
    name: string;
    agent: Agent;
}
```

## API Endpoints

### Create an Agent
- **Endpoint**: `POST /api/agents`
- **Required Fields**:
  - `name`: Agent identifier
  - `description`: Agent description
  - `modelconfig`: Configuration for the model
  - `instructions`: Array of instructions
  - `toolnames`: Array of tool identifiers
- **Response**: Created agent

### Get Available Agents
- **Endpoint**: `GET /api/agents`
- **Response**: List of all available agents

### Get Agent by Name
- **Endpoint**: `GET /api/agents/:name`
- **Required Fields**:
  - `name`: Agent identifier
- **Response**: Single agent matching the name

## Usage Example
```json
POST /api/agents
{
    "name": "researchAgent",
    "description": "Agent for research tasks",
    "modelconfig": {
        "provider": "OPEN_AI",
        "model": "gpt-40-mini",
    },
    "instructions": [
        "Analyze technical content",
        "Summarize findings"
    ],
    "toolnames": ["calculator", "webSearch"]
}
```

## Agent Service Methods
- `createAgent`: Creates new agent with tools
- `getAvailableAgents`: Lists all agents
- `getAgentByName`: Retrieves specific agent

## Integration
Agents can be used in workflows for complex task execution and can utilize multiple tools for enhanced capabilities.