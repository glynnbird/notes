resource "cloudflare_workers_kv_namespace" "noteskv" {
  account_id = var.cloudflare_account_id
  title      = "noteskv-${terraform.workspace}"
}

output "kv_id" {
  value = cloudflare_workers_kv_namespace.noteskv.id
}
