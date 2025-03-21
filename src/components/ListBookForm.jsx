const ListBookForm = () => {
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Sell a Book</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
        {/* Title */}
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Author */}
        <label className="block mb-2 font-semibold">Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* ISBN */}
        <label className="block mb-2 font-semibold">ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Condition */}
        <label className="block mb-2 font-semibold">Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Acceptable">Acceptable</option>
          <option value="Poor">Poor</option>
        </select>

        {/* Price */}
        <label className="block mb-2 font-semibold">Price ($):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Description (Optional):</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded-md mb-4"
        ></textarea>

        {/* Image Upload */}
        <label className="block mb-2 font-semibold">Upload Image (Optional):</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 font-semibold rounded-md hover:bg-purple-700"
        >
          List Book for Sale
        </button>
      </form>
    </div>
};

export default ListBookForm;