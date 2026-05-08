<?php

namespace App\Enums;

enum RegistryType: string
{
    case Font = 'registry:font';
    case Style = 'registry:style';
    case Hook = 'registry:hook';
    case Ui = 'registry:ui';
    case Lib = 'registry:lib';
    case Block = 'registry:block';
    case Component = 'registry:component';
    case Page = 'registry:page';
    case File = 'registry:file';
    case Base = 'registry:base';
    case Item = 'registry:item';
    case Theme = 'registry:theme';
}
