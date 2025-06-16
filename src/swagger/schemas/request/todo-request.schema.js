/**
 * @swagger
 * components:
 *   schemas:
 *     TodoRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Search by title
 *         completed:
 *           type: boolean
 *           description: Filter by completion status
 *         fromDate:
 *           type: string
 *           format: date
 *           description: Created from date (YYYY-MM-DD)
 *         toDate:
 *           type: string
 *           format: date
 *           description: Created to date (YYYY-MM-DD)
 *         page:
 *           type: integer
 *           default: 1
 *           description: Current page
 *         limit:
 *           type: integer
 *           default: 10
 *           description: Number of items per page
 *       example:
 *         title: "Learn Swagger"
 *         completed: false
 *         fromDate: "2025-06-01"
 *         toDate: "2025-06-30"
 *         page: 1
 *         limit: 10
 */
