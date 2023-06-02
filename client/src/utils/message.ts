import { message } from 'antd';

const showSuccessMessage = (content: string) => {
  message.success(content);
}

const showErrorMessage = (content: string) => {
  message.error(content);
}

const showWarningMessage = (content: string) => {
  message.warning(content);
}

const showInfoMessage = (content: string) => {
  message.info(content);
}

const showLoadingMessage = (content: string, duration: number = 2.5) => {
  message.loading(content, duration);
}

export {
  showSuccessMessage,
  showErrorMessage,
  showWarningMessage,
  showInfoMessage,
  showLoadingMessage
}