from ...app_create import create_app

import pytest

collect_ignore = ["lib", "var", "frontend"]
@pytest.fixture
def app():
    app = create_app()
    return app
