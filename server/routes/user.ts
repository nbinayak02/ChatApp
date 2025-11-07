import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const { user } = req as any;
  return res.status(200).json({ data: { id: user.id, name: user.name } });
});

export default router;
