/**
 * @description 文件地址：/frontend/api, 与node代理服务端通讯, 发信息和上传文件两种
 * 
 */
import axios from "axios";

const API_URL = "http://localhost:39100";
/**
 * @param {*} aid String
 * @param {*} message String
 * @returns 
 * {
 *   "id": "msg_abc123",
 *   "object": "thread.message",
 *   "created_at": 1699017614,
 *   "thread_id": "thread_abc123",
 *   "role": "user",
 *   "content": [
 *     {
 *       "type": "text",
 *       "text": {
 *         "value": "How does AI work? Explain it in simple terms.",
 *         "annotations": []
 *       }
 *     }
 *   ],
 *   "file_ids": [],
 *   "assistant_id": null,
 *   "run_id": null,
 *   "metadata": {}
 * }
 */
export const sendMessageToAssistant = async (aid, message) => {
  try {
    const response = await axios.post(`${API_URL}/chat/${aid}`, { question: message });
    return response.data;
  } catch (error) {
    console.error("Error sending message to assistant:", error);
    throw error;
  }
};
/**
 * 
 * @param {*} file File
 * @returns 
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};