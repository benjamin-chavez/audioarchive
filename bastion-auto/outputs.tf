# infrastructure/modules/bastion-host/outputs.tf

## ec2_bastion_instance_ids
output "ec2_bastion_instance_ids" {
  description = "Bastion Instance ID"
  value       = module.ec2_bastion_instance.id
}

## ec2_bastion_public_ip
output "bastion_instance_eip" {
  description = "Elastic IP associated to the Bastion Host"
  value       = aws_eip.bastion_instance_eip.public_ip
}
