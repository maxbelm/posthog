# Generated by Django 3.2.16 on 2023-03-30 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posthog', '0313_automation_edges'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutomationRun',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(blank=True, max_length=24, null=True)),
                ('automation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posthog.automation')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posthog.team')),
            ],
        ),
    ]