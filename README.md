# Fullstack_Dev_Lab1
Challenges:
1. Problems with port 5000. Something was running on it. Solution switch to different port: 3001.
2. Several issues with connecting backend and frontend: I was getting 404 multiple times for different routes even though the parameter was correctly passed and the data with that property was in the database. Tracking if the problem was on backend or frontend with console.logs, postman or development tools in browser. Biggest problem was with the update and retrieval by Id, I actually in the end used retrieval by name and updated accordingly.
3. Syncing all the async methods and rendering, I am using dynamic rendering so it was especially challenging. Maybe an overkill for such a small project but wanted to do "best practice" regardless.