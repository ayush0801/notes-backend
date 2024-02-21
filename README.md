# Notes App

The Notes App is a simple application that allows users to manage their notes. Users can create, delete, search, update, read a particular note, and share notes.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```
2. Install Dependencies
  ```
  npm install
  ```
3. Set up MongoDB:

  - Ensure MongoDB is installed on your machine or use a remote MongoDB server.
  - Update the MongoDB connection string in the config.js file.

4. Start the application:
  ```
  npm start
  ```
The application will be running on http://localhost:3000.

# API Endpoints
## Create a Note

 - Endpoint: `POST /api/notes`
 - Description: Create a new note.
 - Request Body:
   ```
   {
    "title": "Note Title",
    "content": "Note Content"
   }
   ```
## Delete a Note
   - Endpoint: `DELETE /api/notes/:id`
   - Description: Delete a note by ID.
   - Request:
        - No request body is required.

## Search for Notes

 - Endpoint: `GET /api/notes/search?q=keyword`
 - Description: Search for notes by a keyword.
 - Request:
        - No request body is required.

## Update a Note

  - Endpoint: `PUT /api/notes/:id`
  - Description: Update a note by ID.
  - Request:
    ```
    {
      "title": "Updated Note Title",
      "content": "Updated Note Content"
    }
    ```
## Read a Particular Note

   - Endpoint: `GET /api/notes/:id`
   - Description: Get details of a note by ID.
   - Request:
        - No request body is required.

## Share a Note

   - Endpoint: `POST /api/notes/share/:id`
   - Description: Share a note with other users.
   - Request:
     ```
     {
      "userIds": ["user_id_1", "user_id_2", "..."]
     }
     ```


Make sure to replace placeholder values such as "yourusername," "some_note_id," and "user_id_1" with your actual values. You can also customize the documentation based on your API endpoints, request/response structures, and specific features.
