import logging
import logging.config
import os

import yaml


def init_logging():
    logger_conf_path = os.path.realpath(
        os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "logconf.yaml"))
    with open(logger_conf_path) as config_file:
        config = yaml.load(config_file)
        config.setdefault('version', 1)
        logging.config.dictConfig(config)
