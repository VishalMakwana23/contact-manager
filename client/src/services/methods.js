import axios from "axios";
import AxiosCreator, { nodeApiUrl } from "./httpServices";
import toast from "react-hot-toast";

export const GET = async (url) => {
  try {
    const res = await AxiosCreator.get(url);
    return res.data;
  } catch (error) {
    console.log("Get method error:", error);
    throw error;
  }
};

export const POST = async (url, payload) => {
  try {
    const res = await AxiosCreator.post(url, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

// --- for the form data (like if you want to upload images)
export const FORM_DATA_POST = async (url, payload) => {
  try {
    const res = await axios({
      method: "post",
      url: `${nodeApiUrl}${url}`,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage?.getItem("accessToken") || "",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Form data post error:", error);
    throw error;
  }
};

export const PUT = async (url, payload) => {
  try {
    const res = await AxiosCreator.put(url, payload);
    return res.data;
  } catch (error) {
    console.log("Put method error:", error);
    throw error;
  }
};

export const DELETE = async (url) => {
  try {
    const res = await AxiosCreator.delete(url);
    return res.data;
  } catch (error) {
    console.log("Delete method error:", error);
    throw error;
  }
};
