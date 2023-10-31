import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

interface Props {
  _id: string;
  name: string;
  numberQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, numberQuestions, showCount }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex items-center justify-between gap-2"
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{numberQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
