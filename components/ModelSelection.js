"use client";
import React from "react";
import useSWR from "swr";
import Select from "react-select";

const fetchModels = async () =>
  await fetch("/api/getEngines").then((res) => res.json());

function ModelSelection() {
  const { data: modelOptions, isLoading } = useSWR("models", fetchModels);

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  return (
    <div className="my-2">
      <Select
        className="mt-2"
        options={modelOptions?.modelOptions ?? []}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
        placeholder={model}
        defaultValue={model}
        clas
      />
    </div>
  );
}

export default ModelSelection;
