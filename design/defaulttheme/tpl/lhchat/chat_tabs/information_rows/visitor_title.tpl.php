<h6 class="font-weight-bold"><i class="material-icons">face</i><?php if ($chat->nick != 'Visitor') : ?><?php echo htmlspecialchars($chat->nick)?><?php else : ?><?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('chat/adminchat','Visitor')?><?php endif; ?></h6>