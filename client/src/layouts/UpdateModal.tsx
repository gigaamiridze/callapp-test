import { Modal, Input, Select, Button } from 'antd';
import { FlagOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { IUpdateModalProps } from '../interfaces';
import { useUserStore } from '../store';
import { showSuccessMessage, showErrorMessage } from '../utils';
import { InputsContainer } from '../components';

function UpdateModal(props: IUpdateModalProps) {
  const { selectedRow, setInputValues, inputValues, setIsModalOpen, isModalOpen } = props;
  const { updateUser } = useUserStore();
  const genders = ['male', 'female'];

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prevValues) => {
      return ({
        ...prevValues,
        [name]: value,
      });
    });
  }

  const handleAddressChange = (key: string, value: string) => {
    setInputValues((prevValues) => {
      return ({
        ...prevValues,
        address: {
          ...prevValues?.address,
          [key]: value,
        }
      })
    });
  }

  const handleSave = () => {
    const updatedData = {
      ...selectedRow,
      ...inputValues,
    }

    /*
    I'm deleting the generated unique key for the data because 
    I don't want it to be captured in the JSON file and after the table
    */
    delete updatedData.key;

    updateUser(selectedRow?.id, updatedData)
      .then(response => {
        showSuccessMessage(`User with ID ${response.user.id} updated successfully`);
      })
      .catch(error => {
        showErrorMessage(error.response.data.message);
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <Modal
      title='Do you want to save data?'
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key='save' type='primary' onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <InputsContainer>
        <Input
          name='name'
          id='name'
          placeholder='Name'
          value={inputValues?.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          addonBefore={<UserOutlined />}
          allowClear
        />
        <Input
          name='email'
          id='email'
          placeholder='Email'
          value={inputValues?.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          addonBefore={<MailOutlined />}
          allowClear
        />
        <Select
          placeholder='Select gender'
          value={inputValues?.gender}
          onChange={(value) => handleInputChange('gender', value)}
          options={genders.map(gender => ({ label: gender, value: gender }))}
          style={{ width: '100%' }}
        />
        <Input
          name='city'
          id='city'
          placeholder='City'
          value={inputValues?.address?.city}
          onChange={(e) => handleAddressChange('city', e.target.value)}
          addonBefore={<HomeOutlined />}
          allowClear
        />
        <Input
          name='street'
          id='street'
          placeholder='Street'
          value={inputValues?.address?.street}
          onChange={(e) => handleAddressChange('street', e.target.value)}
          addonBefore={<FlagOutlined />}
          allowClear
        />
        <Input
          name='phone'
          id='phone'
          placeholder='Phone'
          value={inputValues?.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          addonBefore={<PhoneOutlined />}
          allowClear
        />
      </InputsContainer>
    </Modal>
  )
}

export default UpdateModal;