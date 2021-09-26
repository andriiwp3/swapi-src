import MultiRangeSlider from "multi-range-slider-react";

export default function BirthDateRange({
  min,
  max,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}) {
  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  return (
    <div>
      <p className="text-center mb-4">
        Values with a minus are dates that occurred before the Battle of Yavin
      </p>
      <MultiRangeSlider
        min={min}
        max={max}
        step={8}
        ruler={false}
        label={true}
        preventWheel={false}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
}
