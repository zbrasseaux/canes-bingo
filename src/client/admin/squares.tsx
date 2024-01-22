import {
  ChipField,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  ReferenceArrayField,
  ReferenceArrayInput,
  required,
  Show,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
  TopToolbar,
  WrapperField,
} from 'react-admin';

const SquaresList = () => (
  <List perPage={100} pagination={false}>
    <Datagrid bulkActionButtons={false} rowClick="show">
      <TextField source="id" label="ID" sortable={false} />
      <TextField source="value" sortable={false} />
      <ReferenceArrayField source="categories" reference="categories" sortable={false}>
        <SingleFieldList linkType="show">
          <ChipField source="label" />
        </SingleFieldList>
      </ReferenceArrayField>
      <WrapperField>
        <EditButton />
        <DeleteButton mutationMode="pessimistic" />
      </WrapperField>
    </Datagrid>
  </List>
);

const SquareEdit = () => (
  <Edit
    transform={(data: { id: number, value: string, categories: Array<number> }) => ({
      squareId: data.id,
      content: data.value,
      categories: data.categories
    })}
  >
    <SimpleForm>
      <TextInput disabled source="id" name="ID" />
      <TextInput source="value" name="value" validate={required()} fullWidth />
      <ReferenceArrayInput name="categories" source="categories" reference="categories" />
    </SimpleForm>
  </Edit>
);

const SquareCreate = () => (
  <Create
    redirect="list"
    transform={(data: { value: string, categories: Array<number> }) => ({
      content: data.value,
      categories: data.categories
    })}
  >
    <SimpleForm>
      <TextInput source="value" name="value" validate={required()} />
      <ReferenceArrayInput name="categories" source="categories" reference="categories" />
    </SimpleForm>
  </Create>
);

const SquareShow = () => (
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
      <TextField source="value" />
      <ReferenceArrayField source="categories" reference="categories">
        <SingleFieldList linkType="show">
          <ChipField source="label" />
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);

export default {
  list: SquaresList,
  edit: SquareEdit,
  create: SquareCreate,
  show: SquareShow,
};
