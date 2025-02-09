# Tools Documentation

## Overview
Tools are modular components that can be created and managed through the API. Each tool consists of a name, description, schema, and executable function.

## Tool Model
Tools are represented by the `ToolM` interface:
```typescript
interface ToolM {
    name: string;
    tool: Tool;
}
```

## API Endpoints

### Create a Tool
- **Endpoint**: `POST /api/tools`
- **Required Fields**:
  - `name`: Tool identifier
  - `description`: Tool description
  - `schema`: Zod schema for input validation
  - `execute`: Function to be executed
- **Response**: Created tool

### Get Available Tools
- **Endpoint**: `GET /api/tools`
- **Response**: List of all available tools

### Get Tool by ID
- **Endpoint**: `GET /api/tools/:id`
- **Required Fields**:
  - `id`: Tool identifier
- **Response**: Single tool matching the ID

## Usage Example
```json
POST /api/tools
{
    "name": "calculator",
    "description": "Performs basic math operations",
    "schema": {
        "topic": "The topic to search for",
        "limit": "Number of articles to fetch",
    },
    "execute": "async function(params) { /* implementation */ }"
}
```

## Tool Service Methods
- `createTool`: Creates new tool
- `getAvailableTools`: Lists all tools
- `getToolById`: Retrieves specific tool

## Integration
Tools can be integrated into agents for extended functionality.