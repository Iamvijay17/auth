import { Image, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { IoMdCloudUpload } from "react-icons/io";

const PackagesCrud = ({ currentRecord }) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const generateFileList = (urls) => {
    return urls.map((url, index) => ({
      uid: `${Date.now()}-${index}`,
      name: `image-${index + 1}.png`,
      status: 'done',
      url: url
    }));
  };

  useEffect(() => {
    if (currentRecord?.images?.length > 0) {
      const updatedFileList = generateFileList(currentRecord.images);
      setFileList((prevFileList) => {
        const uniqueFileList = [
          ...updatedFileList.filter(
            (newFile) => !prevFileList.some((file) => file.url === newFile.url)
          )
        ];
        return uniqueFileList;
      });
    }
  }, [currentRecord?.images]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update file list when files are added/removed
  };

  const handlePreview = async(file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        showUploadList={{
          showRemoveIcon: true,
          showDownloadIcon: false
        }}
      >
        {fileList.length < 8 && (
          <div>
            <span><IoMdCloudUpload size={32} color='#1890ff'/></span>
          </div>
        )}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none'
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default PackagesCrud;
