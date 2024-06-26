-- name: RegisterStudent :one
INSERT INTO students(id, created_at, updated_at, name,subject,class,fees,fee_status)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
RETURNING *;

-- name: DeleteStudent :exec
DELETE FROM students WHERE name=$1
RETURNING *;

-- name: UpdateFeeStatus :exec
UPDATE students SET fee_status=$1 WHERE name=$2;