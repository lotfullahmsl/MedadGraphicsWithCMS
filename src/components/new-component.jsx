"use client";
import React from "react";

function NewComponent({
  item,
  handleImageUpload,
  handleUrlUpload,
  handleContentUpdate,
}) {
  return (
    <div className="mb-6 p-4 border rounded">
      <p className="font-bold mb-2">Project ID: {item.id}</p>
      <div className="mb-2">
        <label className="block text-sm mb-1">Upload Image</label>
        <input
          type="file"
          onChange={(e) =>
            handleImageUpload("portfolio", item.id, e.target.files[0])
          }
          className="w-full mb-2"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-1">Or Image URL</label>
        <input
          type="text"
          placeholder="Enter image URL"
          onChange={(e) =>
            handleUrlUpload("portfolio", item.id, e.target.value)
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <input
        type="text"
        value={item.title}
        onChange={(e) => {
          const newPortfolio = content.portfolio.map((p) =>
            p.id === item.id ? { ...p, title: e.target.value } : p
          );
          handleContentUpdate("portfolio", newPortfolio);
        }}
        className="w-full p-2 border rounded mb-2"
        placeholder="Project Title"
      />
      <textarea
        value={item.description}
        onChange={(e) => {
          const newPortfolio = content.portfolio.map((p) =>
            p.id === item.id ? { ...p, description: e.target.value } : p
          );
          handleContentUpdate("portfolio", newPortfolio);
        }}
        className="w-full p-2 border rounded"
        placeholder="Project Description"
      />
    </div>
  );
}

function NewComponentStory() {
  const sampleItem = {
    id: 123,
    title: "Sample Project",
    description: "Description of sample project",
  };

  const handleImageUpload = (type, id, file) => {
    // Logic to handle image upload
  };

  const handleUrlUpload = (type, id, url) => {
    // Logic to handle url upload
  };

  const handleContentUpdate = (type, updatedPortfolio) => {
    // Logic to handle content update
  };

  return (
    <div>
      <NewComponent
        item={sampleItem}
        handleImageUpload={handleImageUpload}
        handleUrlUpload={handleUrlUpload}
        handleContentUpdate={handleContentUpdate}
      />
    </div>
  );
}

export default NewComponent;