import { useCallback } from 'react';
import { Button, Input } from 'reactstrap';
import { GenericModal, FieldWrapper } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { ToolbarModalProps } from '../Toolbar';
import { useForm } from 'react-hook-form';
import { useMove } from 'tapis-hooks/files';
import { focusManager } from 'react-query';
import { useEffect } from 'react';

const RenameModal: React.FC<ToolbarModalProps> = ({
  toggle,
  systemId,
  path,
  selectedFiles,
}) => {
  const file = selectedFiles![0];

  const onSuccess = useCallback(() => {
    // Calling the focus manager triggers react-query's
    // automatic refetch on window focus
    focusManager.setFocused(true);
  }, []);

  const { move, isLoading, error, isSuccess, reset } = useMove();

  useEffect(() => {
    reset();
  }, [reset]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { ref: newnameRef, ...newnameFieldProps } = register('newname', {
    required: "'newname' is a required field",
    maxLength: {
      value: 255,
      message: "'newname' cannot be longer than 255 characters",
    },
    pattern: {
      value: /[a-zA-Z0-9_.-]+/,
      message:
        "Must contain only alphanumeric characters and the following: '.', '_', '-'",
    },
    disabled: isSuccess,
  });

  const onSubmit = ({ newname }: { newname: string }) => {
    move(systemId!, `${path}${file.name}`, `${path}${newname}`, {
      onSuccess,
    });
  };

  const dirOrFile = (type: string) => {
    return type === 'dir' ? 'directory' : type;
  };

  return (
    <GenericModal
      toggle={toggle}
      title={`Rename ${dirOrFile(file.type!)}`}
      body={
        <div>
          <form id="rename-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldWrapper
              label={`${
                dirOrFile(file.type!).charAt(0).toUpperCase() +
                dirOrFile(file.type!).slice(1)
              } Name`}
              required={true}
              description={`Rename ${dirOrFile(file.type!)} '${
                file.name
              }' in path '${path === '' ? '/' : path}'`}
              error={errors['newname']}
            >
              <Input
                bsSize="sm"
                {...newnameFieldProps}
                innerRef={newnameRef}
                aria-label="Input"
              />
            </FieldWrapper>
          </form>
        </div>
      }
      footer={
        <SubmitWrapper
          isLoading={false}
          error={error}
          success={isSuccess ? `Successfully renamed` : ''}
          reverse={true}
        >
          <Button
            form="rename-form"
            color="primary"
            disabled={isLoading || isSuccess}
            aria-label="Submit"
            type="submit"
          >
            Rename
          </Button>
        </SubmitWrapper>
      }
    />
  );
};

export default RenameModal;
