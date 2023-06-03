import { Modal, Form, Input, Select, Button } from 'antd';
import { FlagOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { ICreateModalProps, InputValues } from '../interfaces';
import { useUserStore } from '../store';
import { showSuccessMessage, showErrorMessage } from '../utils';

function CreateModal(props: ICreateModalProps) {
  const { setIsCreateModalOpen, isCreateModalOpen } = props;
  const { createUser } = useUserStore();
  const [form] = Form.useForm();
  const genders = ['male', 'female'];

  const handleSave = (inputValues: InputValues) => {
    const { street, city, ...restValues } = inputValues;
    const address = { street, city };
    const userData = { ...restValues, address };

    createUser(userData)
      .then(response => {
        showSuccessMessage(response.message);
      })
      .catch(error => {
        showErrorMessage(error.response.data.message);
      });

    setIsCreateModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
  }

  return (
    <Modal
      title='Create user'
      centered
      open={isCreateModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button 
          key='save' 
          type='primary' 
          htmlType='submit' 
          onClick={() => form.submit()}
        >
          Save
        </Button>
      ]}
    >
      <Form
        form={form}
        onFinish={handleSave}
        autoComplete='off'
      >
        <Form.Item
          name='name'
          rules={[
            { required: true, message: 'Please enter your name' },
            { min: 4, message: 'Minimum 4 characters required' },
            { max: 20, message: 'Maximum 20 characters allowed' },
          ]}
        >
          <Input
            placeholder='Name'
            addonBefore={<UserOutlined />}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please enter your email', },
            { type: 'email', message: 'Please enter a valid email', },
          ]}
        >
          <Input
            placeholder='Email'
            addonBefore={<MailOutlined />}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name='gender'
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select
            placeholder='Select gender'
            options={genders.map(gender => ({ label: gender, value: gender }))}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name='city'
          rules={[
            { required: true, message: 'Please enter your city' },
            { min: 4, message: 'Minimum 4 characters required' },
            { max: 20, message: 'Maximum 20 characters allowed' },
          ]}
        >
          <Input
            placeholder='City'
            addonBefore={<HomeOutlined />}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name='street'
          rules={[
            { required: true, message: 'Please enter your street' },
            { min: 4, message: 'Minimum 4 characters required' },
            { max: 30, message: 'Maximum 30 characters allowed' },
          ]}
        >
          <Input
            placeholder='Street'
            addonBefore={<FlagOutlined />}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name='phone'
          rules={[{ required: true, message: 'Please enter your phone' }]}
        >
          <Input
            placeholder='phone'
            addonBefore={<PhoneOutlined />}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateModal;