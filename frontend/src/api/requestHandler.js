const handleRequest = async (requestFn) => {
  try {
    const res = await requestFn();
    return res.data;
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong",
    };
  }
};

export default handleRequest;