import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Divider,
  Form,
  Radio,
  RadioChangeEvent,
  Tooltip,
  Typography
} from 'antd';

import { selectBoardArgs, updateBoardArg } from '@slices';
import { useAppDispatch } from '@app/store.ts';
import { SingleGroup } from '@app/types.ts';
import { useGroups } from '@hooks';

type RadioOptionProps = {
  groupName: SingleGroup;
  showDivider: boolean;
}

export default function OptionRadio({ groupName, showDivider }: RadioOptionProps) {
  const dispatch = useAppDispatch();
  const { groups } = useGroups();
  const boardArgs = useSelector(selectBoardArgs);

  const group = useMemo(
    () => groups[groupName],
    [groupName, groups]
  );

  const selected = useMemo(
    () => {
      const category = boardArgs[groupName];
      return category ? category.name : undefined;
    },
    [boardArgs, groupName]
  );

  const handleChange = useCallback(({ target }: RadioChangeEvent) => {
    const value = group!.categories.find((c) => c.name === target.value)!;
    dispatch(updateBoardArg({ groupName, value }));
  }, [dispatch, group, groupName]);

  return !group || !selected ? null : (
    <>
      {showDivider && <Divider />}
      <Form.Item
        label={
          <Typography.Text strong>
            {group.label}
          </Typography.Text>
        }
      >
        <Radio.Group onChange={handleChange}
                     value={selected}
                     buttonStyle="solid"
                     optionType="button"
                     size="large"
        >
          {group.categories.map((cat) => !cat.description ? (
            <Radio.Button value={cat.name}>{cat.label}</Radio.Button>
          ) : (
            <Tooltip title={cat.description}>
              <Radio.Button value={cat.name}
                            title={cat.description}
              >{cat.label}</Radio.Button>
            </Tooltip>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  )
}
