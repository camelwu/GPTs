# README
该项目是一个与 OpenAI 的 Assistant-API 集成的 Express.js 服务器。它包括文件上传、创建和管理 OpenAI 助手以及使用助手处理聊天交互等功能。 
## 介绍
该服务器旨在与 OpenAI 的 API 进行交互，为聊天功能和文件管理提供接口。它用于multer处理文件上传、body-parser中间件cors支持以及dotenv环境变量管理。
## 安装
要开始此项目，请按照下列步骤操作：

克隆存储库：
```
git clone https://github.com/paulatgh/GPT.git
```
安装依赖项：
```
pnpm install 
```
.env在根目录中

启动服务器使用以下命令运行服务器：
```
pnpm start
```


### API接口
`GET /assistants` 
Description: Retrieves a list of all assistants. 

`POST /assistants` 
Description: Creates a new assistant. Payload: { "name": "Your assistant name", "instructions": "Your gpts prompt", "tools":[], "model": "" } 

`POST /chat/:assistantid` 
Description: Sends a chat question to the OpenAI assistant and returns its response. Payload: { "question": "Your question here" }  

`POST /upload` 
Description: Uploads a file to be used with the OpenAI assistant. Form-data: file: [Your File Here], assistantId: "assistantId"

## 使用说明
### 创建 
```js
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const myAssistant = await openai.beta.assistants.create({
    instructions:
      "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
    name: "Math Tutor",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4",
  });

  console.log(myAssistant);
}

main();
```
Response 
```json
// Create an assistant with a model and instructions.
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1698984975,
  "name": "Math Tutor",
  "description": null,
  "model": "gpt-4",
  "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
  "tools": [
    {
      "type": "code_interpreter"
    }
  ],
  "file_ids": [],
  "metadata": {}
}
```
### 获取某个
```js
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const myAssistant = await openai.beta.assistants.retrieve(
    "asst_abc123"
  );

  console.log(myAssistant);
}

main();
```
Response
```json
// Retrieves an assistan by its ID.
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1699009709,
  "name": "HR Helper",
  "description": null,
  "model": "gpt-4",
  "instructions": "You are an HR bot, and you have access to files to answer employee questions about company policies.",
  "tools": [
    {
      "type": "retrieval"
    }
  ],
  "file_ids": [
    "file-abc123"
  ],
  "metadata": {}
}
```
### 获取列表
```js
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const myAssistants = await openai.beta.assistants.list({
    order: "desc",
    limit: "20",
  });

  console.log(myAssistants.data);
}

main();
```
Response
```json
// Returns a list of assistants
{
  "object": "list",
  "data": [
    {
      "id": "asst_abc123",
      "object": "assistant",
      "created_at": 1698982736,
      "name": "Coding Tutor",
      "description": null,
      "model": "gpt-4",
      "instructions": "You are a helpful assistant designed to make me better at coding!",
      "tools": [],
      "file_ids": [],
      "metadata": {}
    },
    {
      "id": "asst_abc456",
      "object": "assistant",
      "created_at": 1698982718,
      "name": "My Assistant",
      "description": null,
      "model": "gpt-4",
      "instructions": "You are a helpful assistant designed to make me better at coding!",
      "tools": [],
      "file_ids": [],
      "metadata": {}
    },
    {
      "id": "asst_abc789",
      "object": "assistant",
      "created_at": 1698982643,
      "name": null,
      "description": null,
      "model": "gpt-4",
      "instructions": null,
      "tools": [],
      "file_ids": [],
      "metadata": {}
    }
  ],
  "first_id": "asst_abc123",
  "last_id": "asst_abc789",
  "has_more": false
}
```
## 参与贡献
