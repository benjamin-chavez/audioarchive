# infrastructure/modules/networking/outputs.tf
output "aws_vpc" {
  value = aws_vpc.aws_vpc.id
}

output "public_subnets" {
  value = [aws_subnet.public_subnets[0].id, aws_subnet.public_subnets[1].id]

}
output "private_subnets_client" {
  value = [aws_subnet.private_subnets_client[0].id, aws_subnet.private_subnets_client[1].id]
}

output "private_subnets_server" {
  value = [aws_subnet.private_subnets_server[0].id, aws_subnet.private_subnets_server[1].id]
}

output "database_subnet_group_name" {
  description = "The name of the database subnet group"
  value       = aws_db_subnet_group.database_subnet_group.name
}
