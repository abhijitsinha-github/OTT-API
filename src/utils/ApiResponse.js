// CLASS TO SET RESPONSE FOR CLIENT
class ApiResponse {
  constructor(message, data, statusCode) {
    this.status = "success";
    this.message = message;
    this.data = data || null;
    this.statusCode = statusCode;
  }
}

// FUNCTION TO SEND RESPONSE TO THE CLIENT
const sendRes = (response, res) => {
  return res.status(response.statusCode).json({
    status: response.status,
    status_code: response.statusCode,
    message: response.message,
    data: response.data,
  });
};

export { ApiResponse, sendRes };
