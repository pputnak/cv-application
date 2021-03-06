import produce from 'immer';
import { v4 } from 'uuid';

export const MEDIUM_PLACEHOLDER =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

export interface WorkProps {
  id: string;
  Name: string;
  From: string;
  To: string;
  Details: string;
}

export interface SkillProps {
  skill: string;
  id: string;
}

function handleOnchange(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string
): void {
  if (e.currentTarget.value === '') {
    setState(placeholder);
  } else {
    setState(e.currentTarget.value);
  }
}

export function handleImage(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
): void {
  if (!e.target.files) return;
  const reader = new FileReader();
  const file = e.target.files[0];
  const afterDot = file?.name.split('.').pop();
  const imageExtensions = ['png', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'];
  if (file && afterDot && imageExtensions.includes(afterDot)) {
    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === 'string')
        setState(reader.result);
    };
    reader.readAsDataURL(file);
  }
}

export function handleName(
  e: React.ChangeEvent<HTMLInputElement>,
  state: WorkProps[],
  setState: React.Dispatch<React.SetStateAction<WorkProps[]>>,
  index: number
): void {
  const clone = produce(state, (draft) => {
    const copy = draft;
    if (e.currentTarget.value === '') copy[index].Name = 'Company Name';
    else copy[index].Name = e.currentTarget.value;
  });
  setState(clone);
}

export function handleFrom(
  e: React.ChangeEvent<HTMLInputElement>,
  state: WorkProps[],
  setState: React.Dispatch<React.SetStateAction<WorkProps[]>>,
  index: number
): void {
  const clone = produce(state, (draft) => {
    const copy = draft;
    if (e.currentTarget.value === '') copy[index].From = 'From';
    else copy[index].From = e.currentTarget.value;
  });
  setState(clone);
}

export function handleTo(
  e: React.ChangeEvent<HTMLInputElement>,
  state: WorkProps[],
  setState: React.Dispatch<React.SetStateAction<WorkProps[]>>,
  index: number
): void {
  const clone = produce(state, (draft) => {
    const copy = draft;
    if (e.currentTarget.value === '') copy[index].To = 'To';
    else copy[index].To = e.currentTarget.value;
  });
  setState(clone);
}

export function handleDetails(
  e: React.ChangeEvent<HTMLInputElement>,
  state: WorkProps[],
  setState: React.Dispatch<React.SetStateAction<WorkProps[]>>,
  index: number
): void {
  const clone = produce(state, (draft) => {
    const copy = draft;
    if (e.currentTarget.value === '') copy[index].Details = MEDIUM_PLACEHOLDER;
    else copy[index].Details = e.currentTarget.value;
  });
  setState(clone);
}

export function handleSkill(
  e: React.ChangeEvent<HTMLInputElement>,
  state: SkillProps[],
  setState: React.Dispatch<React.SetStateAction<SkillProps[]>>,
  index: number
): void {
  const clone = produce(state, (draft) => {
    const copy = draft;
    if (e.currentTarget.value === '') copy[index].skill = 'Skill';
    else copy[index].skill = e.currentTarget.value;
  });
  setState(clone);
}

export function pushWorkState(
  state: WorkProps[],
  setState: React.Dispatch<React.SetStateAction<WorkProps[]>>,
  name: string
): void {
  setState([
    ...state,
    {
      id: v4(),
      Name: name,
      From: 'From',
      To: 'To',
      Details: MEDIUM_PLACEHOLDER,
    },
  ]);
}

export function pushSkillState(
  state: SkillProps[],
  setState: React.Dispatch<React.SetStateAction<SkillProps[]>>
): void {
  setState([
    ...state,
    {
      skill: 'Skill',
      id: v4(),
    },
  ]);
}

export function removeState<T>(
  state: T[],
  setState: React.Dispatch<React.SetStateAction<T[]>>
): void {
  if (state.length <= 0) return;
  const copy = [...state];
  copy.splice(copy.length - 1, 1);
  setState(copy);
}

export default handleOnchange;
