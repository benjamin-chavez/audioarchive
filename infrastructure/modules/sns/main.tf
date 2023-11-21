# infrastructure/modules/sns/main.tf

/*====================================================
      AWS SNS topic for deployment notifications
=====================================================*/

resource "aws_sns_topic" "sns_notifications" {
  name = var.sns_name

  # resource "aws_sns_topic" "general_notifications" {
  # name = var.general_sns_name
}


resource "aws_sns_topic" "codedeploy_notifications" {
  name = var.codedeploy_sns_name
}

resource "aws_sns_topic_subscription" "codedeploy_notifications_email" {
  topic_arn = aws_sns_topic.codedeploy_notifications.arn
  protocol  = "email"
  endpoint  = var.notification_email
}
