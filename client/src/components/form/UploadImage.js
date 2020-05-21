import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { uploadMutation } from "../queries/Product";

const UploadFile = () => {
  const [upload] = useMutation(uploadMutation);

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) =>
    validity.valid &&
    uploadFileMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore();
    });

  return <input type="file" required onChange={onChange} />;
};

export default UploadFile;
