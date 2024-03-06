import { useState } from 'react';

const EventForm = ({ inputData, onSubmit, children }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    const data = Object.fromEntries(formData)
    if(data.file.name === '') {
      delete data.file;
      data.image = inputData?.image
    }
    onSubmit(data);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>

      <div className="control">
      <p>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
        />
        <img width={100} src={imageUrl || inputData?.image} alt={imageUrl} />
      </p>
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>
      </div>

      <p className="form-actions">{children}</p>
    </form>
  );
}

export default EventForm;