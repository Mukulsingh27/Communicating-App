<?php if ((int)erLhcoreClassModelUserSetting::getSetting('new_dashboard',1) == 1) : ?>
    <a class="dropdown-item csfr-required" href="<?php echo erLhcoreClassDesign::baseurl('front/switchdashboard')?>/(action)/tabs"><i class="material-icons">chat</i> <?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('front/default', 'Hide/Show chat tabs'); ?></a>
    <a class="dropdown-item csfr-required" href="<?php echo erLhcoreClassDesign::baseurl('front/switchdashboard')?>/(action)/left_list"><i class="material-icons">widgets</i> <?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('front/default', 'Tabs/List in left column'); ?></a>
<?php endif; ?>