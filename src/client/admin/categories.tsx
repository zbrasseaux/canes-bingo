import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  required,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  WrapperField,
} from 'react-admin';
import camelCase from 'lodash.camelcase';

const CategoriesList = () => (
  <List perPage={100} pagination={false}>
    <Datagrid bulkActionButtons={false} rowClick="show">
      <TextField source="id" label="ID" sortable={false} />
      <TextField source="name"  sortable={false}/>
      <TextField source="label" sortable={false} />
      <ReferenceField source="groupId" label="Group" reference="groups" link="show" emptyText="-" sortable={false}>
        <TextField source="name" sx={{ textTransform: 'capitalize' }} />
      </ReferenceField>
      <BooleanField source="isDefault" label="Default" sortable={false} />
      <WrapperField>
        <EditButton />
        <DeleteButton mutationMode="pessimistic" />
      </WrapperField>
    </Datagrid>
  </List>
);

const CategoryEdit = () => (
  <Edit
    transform={(data: {
      id: number,
      name: string,
      label: string;
      isDefault?: boolean;
      groupId?: number;
    }) => ({
      label: data.label,
      categoryId: data.id,
      name: camelCase(data.name),
      isDefault: data.isDefault || false,
      groupId: data.groupId,
    })}
  >
    <SimpleForm>
      <TextInput disabled source="id" name="ID" />
      <TextInput source="name" name="name" validate={required()} fullWidth />
      <TextInput source="label" name="label" validate={required()} fullWidth />
      <ReferenceInput name="group" source="groupId" reference="groups" />
      <BooleanInput source="isDefault" name="isDefault" label="Make default category for group" />
    </SimpleForm>
  </Edit>
);

const CategoryCreate = () => (
  <Create
    redirect="list"
    transform={(data: {
      name: string,
      label: string,
      isDefault?: boolean,
      groupId?: number
    }) => ({
      label: data.label,
      name: camelCase(data.name),
      isDefault: data.isDefault || false,
      groupId: data.groupId,
    })}
  >
    <SimpleForm>
      <TextInput source="name" name="name" validate={required()} fullWidth />
      <TextInput source="label" name="label" validate={required()} fullWidth />
      <ReferenceInput name="group" source="groupId" reference="groups" />
      <BooleanInput source="isDefault" name="isDefault" label="Make default category for group" />
    </SimpleForm>
  </Create>
);

const CategoryShow = () => (
  <Show
    actions={
      <TopToolbar>
        <EditButton />
        <DeleteButton mutationMode="pessimistic" />
      </TopToolbar>
    }
  >
    <SimpleShowLayout spacing={3}>
      <TextField source="id" label="ID" />
      <TextField source="name" />
      <TextField source="label" />
      <ReferenceField source="groupId" label="Group" reference="groups" link="show" emptyText="-">
        <TextField source="name" sx={{ textTransform: 'capitalize' }} />
      </ReferenceField>
      <BooleanField source="isDefault" label="Default" />
    </SimpleShowLayout>
  </Show>
);

export default {
  list: CategoriesList,
  edit: CategoryEdit,
  create: CategoryCreate,
  show: CategoryShow,
  recordRepresentation: 'label',
};
