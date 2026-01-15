export interface Operation {
  id: string;
  accountSourceNumber: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  validatedAt: string;
  executedAt: string;
  accountSourceId: string;
  accountDestinationId: string
}
