import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import DefaultProps from "./DefaultProps";

interface DataType {
  subject: string;
  coreCompetency: string;
  survey: number;
}
interface PropType {
  data: DataType[];
  width: number;
  height: number;
}

export function WindRose(props: PropType) {
  const { width, height } = props;
  const [state, setState] = useState({ width, height });

  // useEffect(() => {});
}

WindRose.defaultProps = {
  data: DefaultProps,
  width: 500,
  height: 500,
};
