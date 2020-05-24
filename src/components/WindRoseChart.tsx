import React, { useState, useEffect } from "react";
import * as d3 from "d3";

interface PropType {
  width: number;
  height: number;
}

export function WindRose(props: PropType) {
  const { width, height } = props;
  const [state, setState] = useState({ width, height });

  useEffect(() => {
    const { data, columns };
  });
}
