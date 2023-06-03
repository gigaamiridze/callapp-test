import { Modal, Form, Input, Select, Button } from 'antd';
import { FlagOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { IUpdateModalProps, InputValues } from '../interfaces';
import { useUserStore } from '../store';
import { showSuccessMessage, showErrorMessage } from '../utils';

function UpdateModal(props: IUpdateModalProps) {
  const { form, selectedRow, setIsUpdateModalOpen, isUpdateModalOpen  } = props;
  const { updateUser } = useUserStore();
  const genders = ['male', 'female'];

  const handleSave = (inputValues: InputValues) => {
    const { street, city, ...restValues } = inputValues;
    const address = { street, city };
    const updatedData = { ...restValues, address };

    const userData = {
      ...selectedRow,
      ...updatedData,
    }

    /*
    I'm deleting the generated unique key for the data because 
    I don't want it to be captured in the JSON file and after the table
    */
    delete userData.key;

    updateUser(selectedRow?.id, userData)
      .then(response => {
        showSuccessMessage(`User with ID ${response.user.id} updated successfully`);
      })
      .catch(error => {
        showErrorMessage(error.response.data.message);
      });

    setIsUpdateModalOpen(false);
  };

  const handleCancel = () => {
    setIsUpdateModalOpen(false);
  }

  return (
    <Modal
      title='Do you want to save data?'
      centered
      open={isUpdateModalOpen}
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
          rules={[{ required: true, message: 'Please enter your name' }]}
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
            {
              required: true,
              message: 'Please enter your email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
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
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input
            placeholder='City'
            addonBefore={<HomeOutlined />}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name='street'
          rules={[{ required: true, message: 'Please enter your street' }]}
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

export default UpdateModal;