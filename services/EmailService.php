<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . "/../vendor/autoload.php";

class EmailService
{
    private $mail;
    private $config;

    public function __construct()
    {
        $config = require __DIR__ . "/../config/email.php";
        $this->config = $config;

        $this->mail = new PHPMailer(true);
        $this->mail->isSMTP();
        $this->mail->Host = $config['host'];
        $this->mail->SMTPAuth = true;
        $this->mail->Username = $config['username'];
        $this->mail->Password = $config['password'];
        $this->mail->SMTPSecure = 'tls';
        $this->mail->Port = $config['port'];
    }

    public function enviarEmail($destino, $assunto, $mensagem, $replyToEmail = null, $replyToName = null)
    {
        try {
            $this->mail->clearAddresses();
            $this->mail->clearReplyTos();

            $this->mail->setFrom($this->config['username'], 'ECOAR');
            $this->mail->addAddress($destino);

            if ($replyToEmail && $replyToName) {
                $this->mail->addReplyTo($replyToEmail, $replyToName);
            }

            $this->mail->isHTML(true);
            $this->mail->Subject = $assunto;
            $this->mail->Body = $mensagem;
            $this->mail->AltBody = strip_tags($mensagem);

            $this->mail->send();

            return true;
        } catch (Exception $e) {
            error_log("Erro ao enviar email: " . $e->getMessage());
            return false;
        }
    }
}