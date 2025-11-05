import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ status: true, data: (req as any).user });
});

export default router;
