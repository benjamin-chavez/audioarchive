# infrastructure/modules/mq_broker/outputs.tf

output "aws_mq_broker_url" {
  description = "TODO"
  #TODO: Review this I THINK YOU NEED URL NOT ARN
  value = aws_mq_broker.mq_broker.arn
}
