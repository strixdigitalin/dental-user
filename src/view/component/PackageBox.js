import React from "react";

function PackageBox({ item, selectedPackage, setSelectedPackage, index }) {
  return (
    <div
      className={`package ${index == selectedPackage ? "selected" : ""}`}
      onClick={() => setSelectedPackage(index)}
    >
      <div>{item.name}</div>
      <div>Total Questions {item.totalQuestions}</div>
    </div>
  );
}

export default PackageBox;
