# infrastructure/modules/sns/outputs.tf

output "sns_arn" {
  value = aws_sns_topic.sns_notifications.arn
}
